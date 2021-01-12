export interface Rtype_i{
    length?: number;
    bits?: number[];
    instruction: string | undefined,
    format: string | undefined,
    op: number | undefined,
    rs: number | undefined,
    rt: number | undefined,
    rd: number | undefined,
    shiftAmount: number | undefined,
    func: number
}