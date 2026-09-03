import fs from 'fs';
import {parse} from 'csv-parse/sync';

export class CsvUtil{

    static readCSV(filePath:string):Record<string,string>[]{
        return parse(fs.readFileSync(filePath,"utf-8"),{
            columns:true, // first row as headers
            trim:true,
            skip_empty_lines:true
        }) as Record<string,string>[];
    }
}