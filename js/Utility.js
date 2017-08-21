/* 
 * Author: Jacob Leveroni
 * Created 2017-08-20
 * 
 * Utility is where we define functions and objects that will
 * be used throughout our entire application. Any function of object
 * that is not directly related to a certain page or subset of our project
 * will be defined here. This was we can keep functions that are used 
 * throughout our entire application in one area.
*/
class Utility {
    constructor() {

    }

    // generates a 32 character string seperated with '-' that 
    // will statistically always be unique 
    GenerateGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}