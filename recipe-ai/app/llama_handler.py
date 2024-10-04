
import os
import json

from llama_index.llms.openai import OpenAI
from spider import Spider

from app.models import ConvertRecipeRequest, CrawlRequest

# Initialize the LlamaIndex (customize initialization as needed)

def construct_prompt_metadata(example_recipe: str, units: str, products: str, recipeText: str):
    return f"""
        You are a profesional recipe parser. Your job is to return json representation of recipe file.
        Information you receive might be in different languages. You have to translate everything to english.
        You will receive text information which will contain recipe name, products, description and steps, or just some of those.
        You will also receive example recipe to set the structure of json
        You will receive products registered in the system. New recipe might have additional products that are not registered yet. You need to add them to your response
        You will receive units of measurement. You must use these to define how much of each product to use. You MUST use these units in recipe json.
        You MUST convert to these units at all times. The results can not contain new/undefined units.

        Your response json has to contain 2 fields: convertedRecipe - recipe object and productsToCreate - list of products to create
        This is an example recipe json: {example_recipe}. 
        You must respons with plain json (no prefixes/suffixes, it must be possible to parse the json immediately without any transformations)
        Your response json structure must match and be compatible with example.

        Available units - {units}. These are available units to be used with products. You must either use these units directly or convert to these units if needed.

        Current products - {products}. If possible use these products. If the recipe uses products that are not in this json, you have to also add those products to the productsToCreate list

        New recipe text - {recipeText}
    """

def crawl_and_query(request: CrawlRequest) -> str:
    app = Spider(api_key='')

    # Scrape a single URL
    url = 'https://spider.cloud'
    scraped_data = app.scrape_url(url)
    scraped_text = scraped_data[0].content


    prompt = "HELLO THERE HOW ARE YOIU DOING"
    llm = OpenAI( model="gpt-4o-mini")
    response = llm.complete(prompt)

    return "cool"

def convert_recipe(request: ConvertRecipeRequest) -> str:
    prompt = construct_prompt_metadata(request.exampleRecipeJson, request.currentProductsJson, request.currentProductsJson, request.recipeRawText)
    llm = OpenAI( model="gpt-4o-mini")
    response = llm.complete(prompt)
    return response

def test_query(query: str):
    llm = OpenAI( model="gpt-4o-mini")
    response = llm.complete(query)
    return response