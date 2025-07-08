# Database config
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    POSTGRES_SERVER: str
    POSTGRES_PORT: int 
    POSTGRES_USER: str 
    POSTGRES_PASSWORD: str 
    POSTGRES_DB: str

    # @property
    # def SQLALCHEMY_DATABASE_URI(self) -> str:
    #     return (
    #         f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
    #         f"@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    #     )

    @property
    def SQLALCHEMY_ASYNC_DATABASE_URI(self) -> str: 
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Cors config 
    CORS_ORIGINS: list[str]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list[str] = ["*"]
    CORS_ALLOW_HEADERS: list[str] = ["*"]

    # Logging config 
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"
    LOG_FILE: str = "logs/app.log"
    ENABLE_REQUEST_LOGGING: bool = True
    ENABLE_SQL_LOGGING: bool = False

    model_config = ConfigDict(env_file=".env")

settings = Settings()
print("CORS_ORIGINS:", settings.CORS_ORIGINS)
