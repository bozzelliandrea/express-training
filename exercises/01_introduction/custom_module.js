/**
 * __dirname = path to current dit
 * __filename = file name
 * require = commonJs function to use for load modules
 * module = info about the current module
 * process = info about env where the program is being executed
 */

module.exports = {
    dir: () => console.log("Dir Name", __dirname),
    file: () => console.log("File Name", __filename),
    mod: () => console.log("Module Info", module),
    p: () => console.log("Process", process)
}