import fs from 'fs';

export const get = (file) =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(file+".json", "utf8", (err, data) =>{
            if (err){

                return reject(err);
            } 
            resolve(JSON.parse(data));
        });
    })
};

export const write = (file, data) =>{
    return new Promise((resolve, reject) =>{
        fs.writeFile(file+".json", JSON.stringify(data), (err, data) =>{
            if (err) {return reject(err)};
            resolve();
        });
    });

};