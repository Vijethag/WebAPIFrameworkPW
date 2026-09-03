import fs from 'fs'


export class JsonUtil{

    static readJson(filePath:string):Record<string,string>[]{

        return JSON.parse(fs.readFileSync(filePath,"utf-8"));
       
    }
}