import registers from "../../data/registers.json";
/**
 * Method toquery registers
 */
class RegistersQueries{

    /**
     *
     * @param name
     */
    static getRegisterByName(name: string): any {
        let result = registers.find(register => register.name === name);
        if(result){
            return result;
        }else{
            result = registers.find(register => register.assembly_name === name);
            return result;
        }
    }

    /**
     *
     * @param number
     */
    static getRegisterByNumber(num: number): any {
        return registers.find(register => register.number === num);
    }
}

export default RegistersQueries;