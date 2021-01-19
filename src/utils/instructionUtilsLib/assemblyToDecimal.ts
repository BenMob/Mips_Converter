import { Itype_i as IItype } from "../../interfaces/Itype_i";
import { Jtype_i as IJtype} from "../../interfaces/Jtype_i";
import { Rtype_i as IRtype} from "../../interfaces/Rtype_i";
import formats from "../../data/formats.json";
import entries from "../../data/entries.json";

export interface DecimalSchema {
    name : string,
    value: string | number;
}

/**
 * Extracts required fields based for each Type
 * @param type 
 */
const extractEntries = (type : IRtype | IItype | IJtype) => {
    return Object.entries(type).filter(entry => {
        switch (type.format) {
            case formats.R:
                return (
                    entry[0] === entries.op.SHORT ||
                    entry[0] === entries.rs.SHORT ||
                    entry[0] === entries.rd.SHORT ||
                    entry[0] === entries.rt.SHORT ||
                    entry[0] ===  entries.shiftAmount.SHORT ||
                    entry[0] === entries.func.SHORT
                )
            case formats.I:
                return (
                    entry[0] === entries.op.SHORT ||
                    entry[0] === entries.rs.SHORT ||
                    entry[0] === entries.rt.SHORT ||
                    entry[0] === entries.immediate.SHORT          
                )
            case formats.J:
                return (
                    entry[0] === entries.op.SHORT ||
                    entry[0] === entries.address.SHORT
                )       
            default:
                break;
        }
    })
}

/**
 * Returns an array of objects containing a name and a decimal value of each
 * part of the mips intruction. 
 * @param type 
 */
function assemblyToDecimal(type : IRtype | IItype | IJtype) : Array<DecimalSchema> | undefined {

    // Turns an entry array of 2 elements into a valid object mathcing DecimalSchema 
    const objectify = (entry :Array<any>): DecimalSchema => { 
        return entry.length === 2? {name : entry[0], value:entry[1]} : {name: undefined, value: undefined};
    };

    //  Try to extract the entries and objectifies them.
    try {
        const entries = extractEntries(type).map(entry => {
           const result = objectify(entry);
           if(result.name !== undefined && result.value !== undefined){
                return result;
           }else{
               throw new Error("An error occurred while trying to convert from assembly to decimal!")
           }
        })
        return entries;
        
    } catch (error) {
        console.warn(error);
    }
}

export default assemblyToDecimal;





