import Instruction from "./classes/Instruction"

window.onload = () => {
   const input: HTMLInputElement = <HTMLInputElement>document.querySelector("#input");
   const submit: Element = <HTMLElement>document.querySelector("#submit");
   const error: HTMLElement = <HTMLElement>document.querySelector("#error");
   const format: HTMLElement = <HTMLElement>document.querySelector("#format");
   const instruction: HTMLElement = <HTMLElement>document.querySelector("#instruction");
   const decimal: HTMLElement = <HTMLElement>document.querySelector("#decimal");
   const binary: HTMLElement = <HTMLElement>document.querySelector("#binary");

   if(submit){
      submit.addEventListener("click", () => {
         if(input.value){
            error.innerHTML = " ";
            instruction.innerHTML = `Instruction: ${input.value}`;
            format.innerHTML = "Format: R"
            decimal.innerHTML = "Decimal: 34";
            binary.innerHTML = "Binary: 0000 1232 00102 00023 0230";

         }else{
            console.log("Problem")
            error.innerHTML = " ";
            error.innerHTML = "Please, type something!"
         }

         //if(Instruction.correct(input?.nodeValue))
      })
   }else{
      console.error("There is no id called 'submit'")
   }


}