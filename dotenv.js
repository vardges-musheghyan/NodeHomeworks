// requirements ;

// write a module that has a method called config that takes the parameter path to the env file;

// calling the config method you need to pass as an argument(path to the file) and it will add the variables that are valid to the process.env object;

const defaultFilePath = '.env';


// path is used to correctly parse the user given paths;

const path = require('path');

// fs used to read the file

const fs = require('fs');





function config(pathToFile = defaultFilePath) {

    // the origin of the .env file specification https://smartmob-rfc.readthedocs.io/en/latest/2-dotenv.html

    // since we should do this before running the rest, we use readFileSync

    try{
        const fileText = fs.readFileSync(path.resolve(process.cwd(), defaultFilePath)).toString();
    }catch (e) {
        console.error('most probably you have forgotten to create the .env file:((');
        process.exit(1)
    }



    // process.cwd() is used to get the current directory;

    // the rules for .env file

    // 1. we assume that the text should be written in utf-8 format

    // 2. we should write only one assignment on each line;

    const lineSepArr = fileText.split(/\n/g);

    // 3. Any line starting with a hash/pound (“#”) is considered a comment for human readers and is ignored.

    // 4. Leading whitespace is ignored for all lines, including commands, blank lines and comments.

    let commentRegexp = /^(?!#).*(?==)/g;

    const commentIgnoredArr = lineSepArr.filter(el => commentRegexp.test(el))
        .map(el => el.replace(/\s+/, ''));

        for (let el of commentIgnoredArr){
            let [key, value] = el.split('=');
            process.env[key] = value;
        }

}

module.exports = {config};













