export class GlobalUrl {

    // For developement environment

    
    //In case of get request this api Returns list of positional pairs, list of Hindi words, list of strong numbers for the bcv queried. 
    // // and in case of post it updates the corresponding Verses alignments as per the corrections made by user.
    // getnUpdateBCV : string = 'http://127.0.0.1:8000/v2/alignments';

    // // Returns a list of books whose alignments are available
    // getBooks : string = 'http://127.0.0.1:8000/v2/alignments/books';

    // //Returns a list of chapter number of the book queried.
    // getChapters : string = 'http://127.0.0.1:8000/v2/alignments/chapternumbers/';

    // //Returns a list containing the verse numbers for the particular chapter number of a book.
    // getVerses : string = 'http://127.0.0.1:8000/v2/alignments/versenumbers/';   

    // // Returns the lexicon data for the corresponding greek strong number
    // getLexicon : string = 'http://127.0.0.1:8000/v2/lexicons';

    // // Saves the new approved alignments in the feedback lookup table for further use
    // approveAlignments : string = 'http://127.0.0.1:8000/v2/alignments/feedbacks';

    // // Saves the new approved alignments in the feedback lookup table for further use
    // fixAlignments : string = 'http://127.0.0.1:8000/v2/alignments/feedbacks/verses';

    // // Fetch the whole bible alignment
    // grkhin : string = 'http://127.0.0.1:8000/v2/alignments/export/grk';
    
    // // Fetch CSV file
    // csvFile : string = 'http://localhost:4200/assets/reference.csv';

    
    // For Production Environment
    //In case of get request this api Returns list of positional pairs, list of Hindi words, list of strong numbers for the bcv queried. 
    // and in case of post it updates the corresponding Verses alignments as per the corrections made by user.
    getnUpdateBCV : string = 'https://stagingapi.autographamt.com/v2/alignments';

    //Returns a list of books whose alignments are available
    getBooks : string = 'https://stagingapi.autographamt.com/v2/alignments/books';

    //Returns a list of chapter number of the book queried.
    getChapters : string = 'https://stagingapi.autographamt.com/v2/alignments/chapternumbers/';

    //Returns a list containing the verse numbers for the particular chapter number of a book.
    getVerses : string = 'https://stagingapi.autographamt.com/v2/alignments/versenumbers/';   

    //Returns the lexicon data for the corresponding greek strong number
    getLexicon : string = 'https://stagingapi.autographamt.com/v2/lexicons';

    //Saves the new approved alignments in the feedback lookup table for further use
    approveAlignments : string = 'https://stagingapi.autographamt.com/v2/alignments/feedbacks';

    //Saves the new approved alignments in the feedback lookup table for further use
    fixAlignments : string = 'https://stagingapi.autographamt.com/v2/alignments/feedbacks/verses';

    //Fetch the whole bible alignment
    grkhin : string = 'https://stagingapi.autographamt.com/v2/alignments/export/grkhin';

    // Fetch CSV file
    csvFile : string = 'https://align.staging.autographamt.com/assets/reference.csv';
}