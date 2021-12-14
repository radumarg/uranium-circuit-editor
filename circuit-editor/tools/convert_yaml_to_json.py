
import click
import yaml
import json

@click.command()
@click.option(
    "--file", "-f", type=str, required=True, help="Name of file to convert."
)
def main(file):
    with open(file, "r") as inputfile:
        obj = yaml.safe_load(inputfile)
        yaml_file = file.replace("yaml", "json")
        with open(yaml_file, "w") as outputfile:
            outputfile.write(json.dumps(obj))

if __name__ == "__main__":
    main()
