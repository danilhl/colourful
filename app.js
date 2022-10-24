

const cols = document.querySelectorAll('.col')
const copy = document.querySelectorAll('.massage')
const massage = document.querySelectorAll('.firstMassage')



document.addEventListener('keydown', event =>{
    event.preventDefault()
    if(event.code.toLocaleLowerCase() == 'space') {setRandomColor()}
})

document.addEventListener('click', event =>{
    const type = event.target.dataset.type
    if(type == 'lock'){
        const node =
         event.target.tagName.toLowerCase() == 'i'
            ? event.target
            : event.target.children[0]
        node.classList.toggle('fa-lock')
        node.classList.toggle('fa-lock-open')
    }
    else if(type == 'copy') {
        copyToClickBoard(event.target.textContent)
        displayMassageOfCopy()
    }

    
})

function firstMassage(){
    massage.forEach(massage => {
        massage.style.display = 'flex'
        setTimeout(() => {massage.style.display = 'none'}, 6000)
    })
}

function displayMassageOfCopy(){
    copy.forEach(cop =>{
        cop.style.display = 'flex'
        setTimeout(() => {cop.style.display = 'none'}, 2000)
    })
}

function copyToClickBoard(text){
   return navigator.clipboard.writeText(text)
}

function generateRandomColor(){
    const hexCods = '0123456789ABCDEF'
    let color = ''
    for(let i = 0; i < 6; i++){
        color += hexCods[Math.floor(Math.random() * hexCods.length)]
    }
    return '#' + color
}

function setRandomColor(isInitial){

    if(isInitial) firstMassage()

    const colors = isInitial ? getLoacationFromHash() : []
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const lock = col.querySelector('i')

        const color = isInitial 
        ? colors[index] 
            ? colors[index]
            : chroma.random()
        : chroma.random()

        if(isLocked){
            colors.push(text.textContent)
            return
        }
        
        if(!isInitial) colors.push(color)
        

        text.textContent = color
        col.style.background = color

        setTextColor(text, lock, color)
    })
    updateLocationHash(colors)
}

function setTextColor(text, lock, color){
   const luminance = chroma(color).luminance()
   text.style.color = luminance > 0.5 ? 'black' : 'white'
   lock.style.color = luminance > 0.5 ? 'black' : 'white'
}


function updateLocationHash(colors = []){
    document.location.hash = colors.map((col) => col.toString().substring(1)).join('-')
   
}

function getLoacationFromHash(){
    if(document.location.hash.length > 1){
       return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColor(true)