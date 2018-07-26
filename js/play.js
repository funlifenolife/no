var platforms
var player
let staminaGauge
var fly
var floor
var cursors
var jumps = 15
var maxJumps = 15
var maxStamina = 100
var restore
//var fluff
var message
var message2
var goal
const worldHeight = 1800
const worldWidth = 800


function preload() {
    this.load.image('background', '/assets/background.png')
    this.load.image('platform', '/assets/platform.png')
    this.load.image('stamina', '/assets/stamina.png')
    this.load.image('goal', '/assets/goal.png')
    this.load.image('starry', '/assets/background2.png')
    this.load.image('goodnight', '/assets/background3.png')
    this.load.spritesheet('luna', '/assets/luna.png', { frameWidth:32, frameHeight: 32 })
    //this.load.spritesheet('fluff', '/assets/fluff.png', {frameWidth: 32, frameHeight: 32})

    this.load.audio('moon', '/music/kudasai.wav')
    this.load.audio('collect', '/music/collect.wav')
}

function create() {

    this.stamina = 100

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    

    this.add.image(400, 900, 'starry')
    this.add.image(400, 1500, 'background');
    this.add.image(400, 300, 'goodnight')

    this.sound.play('moon')

    
    platforms = this.physics.add.staticGroup();
    
    platforms.create(50, 1768, 'platform').setScale(3)

    platforms.create(145, 1768, 'platform').setScale(3)
    platforms.create(240, 1768, 'platform').setScale(3)
    platforms.create(335, 1768, 'platform').setScale(3)
    platforms.create(431, 1768, 'platform').setScale(3)
    platforms.create(526, 1768, 'platform').setScale(3)
    platforms.create(621, 1768, 'platform').setScale(3)
    platforms.create(716, 1768, 'platform').setScale(3)
    platforms.create(811, 1768, 'platform').setScale(3)
    platforms.create(146, 1550, 'platform').setScale(3)
    platforms.create(238, 1550, 'platform').setScale(3)
    platforms.create(616, 1400, 'platform').setScale(3)
    platforms.create(521, 1400, 'platform').setScale(3)
    platforms.create(275, 1250, 'platform').setScale(3)
    platforms.create(370, 1250, 'platform').setScale(3)
    platforms.create(100, 1100, 'platform').setScale(3)
    platforms.create(195, 1100, 'platform').setScale(3)
    platforms.create(650, 1000, 'platform').setScale(3)
    platforms.create(558, 1000, 'platform').setScale(3)
    platforms.create(300, 850, 'platform').setScale(3)


    goal = this.physics.add.staticGroup();
    
    goal.create(50, -50, 'goal').setScale(3)
    goal.create(145, -50, 'goal').setScale(3)
    goal.create(240, -50, 'goal').setScale(3)
    goal.create(335, -50, 'goal').setScale(3)
    goal.create(431, -50, 'goal').setScale(3)
    goal.create(526, -50, 'goal').setScale(3)
    goal.create(621, -50, 'goal').setScale(3)
    goal.create(716, -50, 'goal').setScale(3)
    goal.create(811, -50, 'goal').setScale(3)
    
    player = this.physics.add.sprite(100, 1650, 'luna');
    player.setBounce(0.2)
    player.setCollideWorldBounds(true);
    player.body.setGravityY(350)
    player.setScale(2)

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, worldWidth, worldHeight);
    
    /*fluff = this.physics.add.sprite(300, 1000, 'fluff')
    fluff.setCollideWorldBounds(true);
    fluff.body.setGravityY(300)
    fluff.setScale(1.5)

    this.add.tween({
        targets: [fluff],
        durration: 1000,
        delay: 0,
        yoyo: true,
        repeat: Infinity,
        ease: 'Sine.easeInOut',
        x: {
            getStart: () => 200,
            getEnd: () => 500
        }
    });
    */

    restore = this.physics.add.staticGroup()
    restore.create(621, 1350, 'stamina')
    restore.create(195, 1050, 'stamina')
    restore.create(650, 955, 'stamina')
    
    /*
    this.physics.add.collider(fluff, platforms)
    this.physics.add.collider(fluff, player)
    */
    this.physics.add.overlap(player, restore, collectRestore, null, this)

    this.physics.add.collider(player, platforms, (player, platform) => {
        jumps = maxJumps;
    });

   this.physics.add.collider(player, restore, (player, restore) => {
        this.sound.play('collect')
        this.stamina = maxStamina
    });

    this.physics.add.collider(player, goal, (player, goal) =>{
    this.anims.play('up')}
)

    this.anims.create({
        key: 'fluff-1',
        frames: this.anims.generateFrameNumbers('fluff', {start: 0, end: 6}),
        frameRate: 5,
        repeat: -1
    });
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('luna', { start: 5, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'luna', frame: 8}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('luna', { start: 9, end: 11}),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create ({
        key: 'up',
        frames: this.anims.generateFrameNumbers('luna', { start: 0, end: 4}),
        frameRate: 10,
        repeat: 0
    })

    cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(player, restore)
    this.physics.add.overlap(player, restore, null, this)

    //message = this.add.text (250, 1100, 'Press up to jump', {fontSize: '29px', fill: '#FFFFFF'})

    //message2 = this.add.text (250, 500, 'Press up twice to double jump', {fontSize: '29px', fill: '#FFFFFF'})

   

    console.log("CREATE GOOD")

    this.sound.play("moon", {
        loop: true

    })

    //fluff.anims.play('fluff-1', true)

    this.scene.manager.start('hud', this)
}

function collectRestore (player, restore){
    restore.disableBody(true, true);
    this.stamina = maxStamina
}

function update() {


    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true)
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        if (player.body.touching.down) {
            player.anims.play('turn');
        }
    }

    if (cursors.up.isDown) { 
        if (jumps > 0 && this.stamina > 0){
        player.setVelocityY(-330)
        player.anims.play('up') 
        jumps--
        this.stamina--
       // message.disableBody
        console.log ("jumps is now ", jumps)
        console.log ("stamina is now ",this.stamina)
        if (player.body.touching.down) {
            jumps = maxJumps
        }
        }   
    }
}

export default {
    preload,
    create,
    update
}