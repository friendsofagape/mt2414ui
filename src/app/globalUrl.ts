export class GlobalUrl {

    Production = "";
    Developement = "http://127.0.0.1:8000/";
    Staging = "https://stagingapi.autographamt.com";

    ApiUrl = this.Staging;

    //In case of get request this api Returns list of positional pairs, list of Hindi words, list of strong numbers for the bcv queried. 
    // and in case of post it updates the corresponding Verses alignments as per the corrections made by user.
    getnUpdateBCV: string = this.ApiUrl + '/v2/alignments';

    //Returns a list of books whose alignments are available
    getBooks: string = this.ApiUrl + '/v2/alignments/books';

    //Returns a list of chapter number of the book queried.
    getChapters: string = this.ApiUrl + '/v2/alignments/chapternumbers/';

    //Returns a list containing the verse numbers for the particular chapter number of a book.
    getVerses: string = this.ApiUrl + '/v2/alignments/versenumbers/';

    //Returns the lexicon data for the corresponding greek strong number
    getLexicon: string = this.ApiUrl + '/v2/lexicons';

    //Saves the new approved alignments in the feedback lookup table for further use
    approveAlignments: string = this.ApiUrl + '/v2/alignments/feedbacks';

    //Saves the new approved alignments in the feedback lookup table for further use
    fixAlignments: string = this.ApiUrl + '/v2/alignments/feedbacks/verses';

    //Fetch the whole bible alignment
    grkhin: string = this.ApiUrl + '/v2/alignments/export';
    
    // Fetch CSV file
    csvFile : string = 'https://staging.autographamt.com/assets/reference.csv';

    // Fetch CSV file
    //csvFile: string = 'http://localhost:4200/assets/reference.csv';

    // Fetch sampleData file    
    //sampleFile: string = 'http://localhost:4200/assets/SampleDemo.json';
    sampleFile: string = 'https://staging.autographamt.com/assets/SampleDemo.json';
    //Fetch all the available language list
    getLang: string = this.ApiUrl + '/v2/alignments/languages';

    //Fetch BCV number
    getBcvSearch: string = this.ApiUrl + '/v2/searchreferences'

    //ResetPassword API
    resetPassword: string = this.ApiUrl + '/v1/resetpassword';

    //Registration API
    registration: string = this.ApiUrl + '/v1/registrations';

    //Auth API
    auth: string = this.ApiUrl + '/v1/auth';

    //forgotPassword API
    forgotPassword: string = this.ApiUrl + '/v1/forgotpassword';

    //fetch translationwords API
    translationwords: string = this.ApiUrl + "/v2/alignments/translationwords/grkhin/";
}