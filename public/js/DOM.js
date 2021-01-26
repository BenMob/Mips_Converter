/**
 * A Class containing static functions to help create various 
 * dom elements.
 */
class DOM{
    static getDiv(){
        return document.createElement('div')
    }

    static getP(){
        return document.createElement('p')
    }

    static getSpan(){
        return document.createElement('span')
    }

    static getTable(){
        return document.createElement('table')
    }

    static getTr(){
        return document.createElement('tr')
    }

    static getTd(){
        return document.createElement('td')
    }

    static getTh(){
        return document.createElement('th');
    }

    static setColSpan(element, number){
        element.setAttribute("colspan", number);
    }

    static addClass(node, classNames){
        if(classNames.length > 0){
            classNames.forEach(className => {
                if(!node.classList.contains(className)){
                    node.classList.add(className);
                }
            });
        }
    }

    static removeClass(node, classNames){
        classNames.forEach(className => {
            if(node.classList.contains(className)){
                node.classList.remove(className);
            }
        })
    }
    
    static write(node, content){
        node.innerHTML = content;
    }
}