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
    templatename = "createquery.txt"
    ### Set the variables name ###
    classname = "ProfileDetails" #Upper camel case
    f = open(directory + "/" + classname + ".jsx", "w")
    gqlconst = "GENERIC_PROFILE_QUERY" #Upper case with underscores
    body = """query{
  genericProfile{
    affiliation
    summary
    experience    
  }
}"""
    fieldcount = 3
    ### End of setting variables ###
    data = htmltext(templatename= templatename, gqlconst=gqlconst, body=body, fieldcount=fieldcount, classname=classname )

    print(data, file=f)

    