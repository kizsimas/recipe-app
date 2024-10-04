from fastapi import FastAPI
from pydantic import BaseModel
from app.llama_handler import convert_recipe, crawl_and_query, test_query
from llama_index.core import Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
import openai

from app.models import ConvertRecipeRequest, CrawlRequest


openai.api_key = ""
llm = OpenAI(model="gpt-4o-mini", temperature=0.5)
Settings.llm = llm

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "root"}

@app.post("/crawl")
def query_llama(request: CrawlRequest):
    response = crawl_and_query()
    print(response)
    return response

@app.post("/convert")
def convert(request: ConvertRecipeRequest):
    result = convert_recipe(request)
    return result

@app.post("/test")
def test(query: str):
    result = test_query(query)
    return result