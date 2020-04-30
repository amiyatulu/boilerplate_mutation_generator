from jinja2 import Environment, PackageLoader, select_autoescape
import json
from pprint import pprint
import os
directory = os.path.dirname(os.path.realpath(__file__))

env = Environment(
    loader=PackageLoader("generateMutation", 'templates'),
    variable_start_string='[@[',
    variable_end_string=']@]',
    autoescape=select_autoescape(['html', 'xml'])
)

def htmltext(templatename="", **kwargs):
    template = env.get_template(templatename)
    return template.render(**kwargs)


if __name__ == "__main__":
    templatename = "createmutation.txt"
    ### Set the variables name ###
    classname = "CreateFeedbackAvrit" #Upper camel case
    f = open(directory + "/" + classname + ".jsx", "w")
    gqlconst = "CREATE_FEEDBACK" #Upper case with underscores
    muationvariablename = "CreateFeedback" #Upper camel case
    mutationname = "createFeedback" #Lower camel case
    # Variables attribute are `String`, `TextArea`, `Int`
    variables = {"name" : "String", "affiliation": "String", "idea": "TextArea", "ideaRating": "Int", "criticism": "TextArea"}
    mutationout = """feedback {
        name
        affiliation
        idea
        ideaRating
        criticism
        challenges
        fundingWilliness
      }"""
    ### End of setting variables ###
    data = htmltext(templatename= templatename, gqlconst=gqlconst, muationvariablename=muationvariablename, mutationname=mutationname, variables=variables, mutationout=mutationout, classname=classname )

    print(data, file=f)

    