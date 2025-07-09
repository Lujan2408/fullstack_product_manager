# ✅ RESPONSABILITIES OF SERVICE : 
# 1. Pure business logic (like create a product, get a product, update a product, delete a product)
# 2. Rules of business
# 3. Data business validation
# 4. Db operations
# 5. MUST NOT contain HTTP 

from app.core.db import AsyncSessionDependency
from app.models.products.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from app.errors.product_errors import ProductNotFoundError, DuplicateProductNameError, NoFieldsToUpdateError
from sqlmodel import select
from app.helpers.format_date import now_without_microseconds
from app.core.logging import logger
import colorama

class ProductService:
    def __init__(self, session: AsyncSessionDependency):
        self.session = session

    async def create_product(self, product_data: ProductCreate):
        logger.info(f"Creating product: {colorama.Fore.YELLOW}{product_data.name}{colorama.Style.RESET_ALL}")

        # Check if a product already exists with the same name
        existing_product = await self.session.execute(select(Product).where(Product.name == product_data.name))
        if existing_product.first():
            raise DuplicateProductNameError(f"Product with name {product_data.name} already exists")

        # Create the product
        product_data_dict = product_data.model_dump()
        product = Product(**product_data_dict)
        self.session.add(product)
        await self.session.commit()
        await self.session.refresh(product)

        logger.info(f"Product created successfully: {colorama.Fore.GREEN}{product.name}✅{colorama.Style.RESET_ALL}")
        return product
    
    async def get_all_products(self):
        logger.info(f"Getting all products: {colorama.Fore.YELLOW}🔍{colorama.Style.RESET_ALL}")

        result = await self.session.execute(select(Product).order_by(Product.id.asc()))
        return result.scalars().all()
    
    async def get_product_by_id(self, product_id: int):
        logger.info(f"Getting product by id: {colorama.Fore.YELLOW}{product_id} {colorama.Fore.GREEN}🔍{colorama.Style.RESET_ALL}")

        product_db = await self.session.get(Product, product_id)

        if not product_db: 
            raise ProductNotFoundError("Product not found or does not exist")

        return product_db
    
    async def update_product(self, product_id: int, product_data: ProductUpdate):
        logger.info(f"Updating product: {colorama.Fore.YELLOW}{product_id} {colorama.Fore.GREEN}🖋️{colorama.Style.RESET_ALL}")

        product_db = await self.session.get(Product, product_id)

        # Check if the product exists
        if not product_db:
            raise ProductNotFoundError("Product not found or does not exist")
        
        # Check if at least one field is provided to update the product
        if not any([
            product_data.name is not None,
            product_data.price is not None,
            product_data.available is not None
        ]):
            raise NoFieldsToUpdateError("At least one field must be provided to update the product")
        
        # Check if already exists a product with the same name
        if product_data.name and product_data.name != product_db.name: 
            result = await self.session.execute(select(Product).where(Product.name == product_data.name))
            existing_product = result.scalar_one_or_none()
            if existing_product:
                raise DuplicateProductNameError(f"Product with name {product_data.name} already exists")

        # Update only the fields that are provided (not None)
        update_data = {}
        if product_data.name is not None:
            update_data["name"] = product_data.name
        if product_data.price is not None:
            update_data["price"] = product_data.price
        if product_data.available is not None:
            update_data["available"] = product_data.available
        
        # Update the product with only the provided fields
        for field, value in update_data.items():
            setattr(product_db, field, value)
        
        # Update the timestamp manually
        product_db.updated_at = now_without_microseconds()
        
        self.session.add(product_db)
        await self.session.commit()
        await self.session.refresh(product_db)

        return product_db
    
    async def delete_product(self, product_id: int):
        logger.info(f"Deleting product: {colorama.Fore.YELLOW}{product_id} {colorama.Fore.RED}🗑️{colorama.Style.RESET_ALL}")

        product_db = await self.session.get(Product, product_id)

        if not product_db:
            raise ProductNotFoundError("Product not found or does not exist")
        
        await self.session.delete(product_db)
        await self.session.commit()

        return product_db

    async def update_availability(self, product_id: int):
        logger.info(f"Updating availability for product: {colorama.Fore.YELLOW}{product_id} {colorama.Fore.GREEN}🔄{colorama.Style.RESET_ALL}")

        product_db = await self.session.get(Product, product_id)

        if not product_db:
            raise ProductNotFoundError("Product not found or does not exist")
        
        # Toggle the availability
        product_db.available = not product_db.available
        
        # Update the timestamp
        product_db.updated_at = now_without_microseconds()
        
        self.session.add(product_db)
        await self.session.commit()
        await self.session.refresh(product_db)

        logger.info(f"Product availability updated: {colorama.Fore.GREEN}{product_db.name} - {'Available' if product_db.available else 'Unavailable'}✅{colorama.Style.RESET_ALL}")
        return product_db