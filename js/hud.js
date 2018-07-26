var staminaText

function preload (){

}
function init (play){
    this.play = play
}
function create (){
    staminaText = this.add.text (16, 16, 'stamina:' + this.play.stamina, {fontSize: '32px', fill: '#657BB7'})
}
function update (){
    staminaText.setText('Stamina: ' + this.play.stamina)
}
export default {
    preload,
    update,
    create,
    init,
}