# boilerplate_mutation_generator


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
