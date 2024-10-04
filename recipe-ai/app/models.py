from pydantic import BaseModel


class CrawlRequest(BaseModel):
    exampleRecipeJson: str
    currentProductsJson: str
    currentUnitsJson: str
    url: str

class ConvertRecipeRequest(BaseModel):
    exampleRecipeJson: str
    currentProductsJson: str
    currentUnitsJson: str
    recipeRawText: str