/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    if( scannedTextObj.length <= 0 || searchTerm.length <= 0)
    {
        //Return a comprehensible result but warn the user if inputs are bad.
        //Checks are also done through the for loops but this lets a user know something is up.
        console.warn("One or more inputs are blank!");
        return result;
    }

    
    //Naive algo for simple assessment. 
    //Loop Over input array if it is not empty 
    for(let bookListIter = 0; bookListIter < scannedTextObj.length; bookListIter++)
    {
        book = scannedTextObj[bookListIter];

        //Case where content is blank is covered in the for loop condition checking the length.
        for(let bookContentIter = 0; bookContentIter < book["Content"].length; bookContentIter++)
        {   
            //Isolate the content field.
            bookContent = book["Content"][bookContentIter];

            //Check if any words spill off of the line.
            //If a word is between lines it is considered part of both lines.
            var lastCharacterOfLine = bookContent["Text"].slice(-1);
            console.log(lastCharacterOfLine);
            console.log(lastCharacterOfLine === "-");
            
            var toSearch = bookContent["Text"];
            if(lastCharacterOfLine === "-" && bookContentIter + 1 < book["Content"].length)
            {
                var restOfHyphenatedWord = book["Content"][bookContentIter + 1]["Text"].split(" ")[0];
                console.log(restOfHyphenatedWord);
                toSearch = toSearch.substring(0, toSearch.length - 1).concat(restOfHyphenatedWord);
                console.log(toSearch);
            }

            //console.log(bookContent["Text"]);
            //Just use js includes method to do a quick string search.
            if(toSearch.includes(searchTerm))
            {
                occurance = {
                    "ISBN" : book["ISBN"],
                    "Page" : bookContent["Page"],
                    "Line" : bookContent["Line"]
                };

                //Check hyphen.
                //Hyphenated words are conidered to be on both lines.
                if(lastCharacterOfLine === "-" && bookContentIter + 1 < book["Content"].length)
                {
                    var OtherPage = book["Content"][bookContentIter + 1]
                    occurance = {
                        "ISBN" : book["ISBN"],
                        "Page" : OtherPage["Page"],
                        "Line" : OtherPage["Line"]
                    };
                    result["Results"].push(occurance);
                }

                result["Results"].push(occurance);

            }
        }
    }


    
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}
