/*
 *  Enemy Class
 *  - class for enemies
 *  By: Caleb
 */
class Enemy extends Entity {
    constructor(config) {
        config.sprite = {
            img: "enemy",
            imgConfig: spriteConfig_Enemy,
        };
        super(config);
        this.type = "enemy";

        this.sprite.img = "enemy";
        this.sprite.imgConfig = spriteConfig_Enemy;
    }
}
