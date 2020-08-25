#!/usr/bin/env node

const fs = require('fs'); //filesystem module from nodejs
//lstat method
const { lstat } = fs.promises; //destructing obj - nodejs
const chalk = require('chalk');
const path = require('path'); //nodejs
// console.log(process.argv);
const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, filenames) => {
    // err === an error obj, means something went wrong
    //OR
    //err === null, no problem; everything ok
    if (err) {
        //add in error handling code here //(if there is an error then error handle here)
        //remember if there is err, may not want to run this
            // so options can be return the error object and display a message, etc.
        console.log(err);
        return;
    }
    //map over filenames
    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });
    const allStats = await Promise.all(statPromises);
    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.yellow(filenames[index]));
        }
    }
});