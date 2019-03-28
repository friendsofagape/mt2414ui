export class GlobalUrl {

    // For developement environment


    //In case of get request this api Returns list of positional pairs, list of Hindi words, list of strong numbers for the bcv queried. 
    // // and in case of post it updates the corresponding Verses alignments as per the corrections made by user.
    // getnUpdateBCV: string = 'http://127.0.0.1:8000/v2/alignments';

    // // Returns a list of books whose alignments are available
    // getBooks: string = 'http://127.0.0.1:8000/v2/alignments/books';

    // //Returns a list of chapter number of the book queried.
    // getChapters: string = 'http://127.0.0.1:8000/v2/alignments/chapternumbers/';

    // //Returns a list containing the verse numbers for the p articular chapter number of a book.
    // getVerses: string = 'http://127.0.0.1:8000/v2/alignments/versenumbers/';

    // // Returns the lexicon data for the corresponding greek strong number
    // getLexicon: string = 'http://127.0.0.1:8000/v2/lexicons';   

    // // Saves the new approved alignments in the feedback lookup table for further use
    // approveAlignments: string = 'http://127.0.0.1:8000/v2/alignments/feedbacks';

    // // Saves the new approved alignments in the feedback lookup table for further use
    // fixAlignments: string = 'http://127.0.0.1:8000/v2/alignments/feedbacks/verses';

    // // Fetch the whole bible alignment
    // grkhin: string = 'http://127.0.0.1:8000/v2/alignments/export';

    // // Fetch CSV file
    //  csvFile: string = 'http://localhost:4200/assets/reference.csv';

    // // Fetch sampleData file
    //  sampleFile: string = 'http://localhost:4200/assets/SampleDemo.json';

    // //Fetch all the available language list
    // getLang: string = 'http://127.0.0.1:8000/v2/alignments/languages';

    // //Fetch BCV number
    // getBcvSearch: string = 'http://127.0.0.1:8000/v2/searchreferences';

    // //ResetPassword API
    // resetPassword: string = 'http://127.0.0.1:8000/v1/resetpassword';

    // //Registration API
    // registration: string = 'http://127.0.0.1:8000/v1/registrations';

    // //Auth API
    // auth: string = 'http://127.0.0.1:8000/v1/auth';

    // //forgotPassword API
    // forgotPassword: string = 'http://127.0.0.1:8000/v1/forgotpassword';

    // //fetch translationwords API
    // translationwords: string = "http://127.0.0.1:8000/v2/alignments/translationwords/grkhin/";

    // For Production Environment
    //In case of get request this api Returns list of positional pairs, list of Hindi words, list of strong numbers for the bcv queried. 
    // and in case of post it updates the corresponding Verses alignments as per the corrections made by user.
    getnUpdateBCV: string = 'https://stagingapi.autographamt.com/v2/alignments';

    //Returns a list of books whose alignments are available
    getBooks: string = 'https://stagingapi.autographamt.com/v2/alignments/books';

    //Returns a list of chapter number of the book queried.
    getChapters: string = 'https://stagingapi.autographamt.com/v2/alignments/chapternumbers/';

    //Returns a list containing the verse numbers for the particular chapter number of a book.
    getVerses: string = 'https://stagingapi.autographamt.com/v2/alignments/versenumbers/';

    //Returns the lexicon data for the corresponding greek strong number
    getLexicon: string = 'https://stagingapi.autographamt.com/v2/lexicons';

    //Saves the new approved alignments in the feedback lookup table for further use
    approveAlignments: string = 'https://stagingapi.autographamt.com/v2/alignments/feedbacks';

    //Saves the new approved alignments in the feedback lookup table for further use
    fixAlignments: string = 'https://stagingapi.autographamt.com/v2/alignments/feedbacks/verses';

    //Fetch the whole bible alignment
    grkhin: string = 'https://stagingapi.autographamt.com/v2/alignments/export';

    // Fetch CSV file
    //csvFile : string = 'https://align.staging.autographamt.com/assets/reference.csv';

    //Fetch CSV file
    csvFile: string = 'https://autographa.herokuapp.com/assets/reference.csv';

    // Fetch sampleData file
    //sampleFile: string = 'https://autographa.herokuapp.com/assets/SampleDemo.json';

    //Fetch all the available language list
    getLang: string = 'https://stagingapi.autographamt.com/v2/alignments/languages';

    //Fetch BCV number
    getBcvSearch: string = 'https://stagingapi.autographamt.com/v2/searchreferences';

    //ResetPassword API
    resetPassword: string = 'https://stagingapi.autographamt.com/v2/resetpassword';

    //Registration API
    //registration: string = 'https://stagingapi.autographamt.com/v1/registrations';
    registration: string = 'https://stagingapi.autographamt.com/v2/registrations';

    //Auth API
    //auth: string = 'https://stagingapi.autographamt.com/v1/auth';
    auth: string = 'https://stagingapi.autographamt.com/v2/auth';

    //forgotPassword API
    forgotPassword: string = 'https://stagingapi.autographamt.com/v2/forgotpassword';

    //fetch translationwords API
    translationwords: string = "https://stagingapi.autographamt.com/v2/alignments/translationwords";

    //fetch list of strongs
    strongslist: string = "https://stagingapi.autographamt.com/v2/alignments/strongs";

    strongLexicon: string = "https://stagingapi.autographamt.com/v2/lexicons";

    requestOrganization: string = "https://stagingapi.autographamt.com/v2/users/organisations";

    createOrganization: string = "https://stagingapi.autographamt.com/v2/organisations";

    createProject: string = "https://stagingapi.autographamt.com/v2/projects";

    userList: string = "https://stagingapi.autographamt.com/v2/users";

    assignments: string = "https://stagingapi.autographamt.com/v2/assignments";

    taskListForUser:string = "https://stagingapi.autographamt.com/v2/users/assignments";

    userListProjectWise:string = "https://stagingapi.autographamt.com/v2/projects/users";

    reports = "https://stagingapi.autographamt.com/v2/alignments/reports";

    feedbackForm = "https://stagingapi.autographamt.com/v2/feedbacks";

    getTarget = "https://stagingapi.autographamt.com/v2/alignments/targetlanguages";

}