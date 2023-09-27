class Champion {
  constructor(name, baseHP, baseHPRegen, HPregenScaling, baseArmor, armorScaling, baseMres, mresScaling, moveSpeed, baseAD, ADscaling, baseAS, aSpeedScaling) {
    this.name = name;
    this.baseHP = baseHP;
    this.bonusHP = 0;
    this.totalMaxHP = this.baseHP + this.bonusHP;
    this.HPregen = baseHPRegen + (this.HPregenScaling * (this.level - 1));
    this.HPregenScaling = HPregenScaling;
    this.baseArmor = baseArmor + (this.armorScaling * (this.level - 1));
    this.bonusArmor = 0;
    this.totalArmor = this.baseArmor + this.bonusArmor;
    this.armorScaling = armorScaling;
    this.baseMres = baseMres + (this.mresScaling * (this.level - 1));
    this.mresScaling = mresScaling;
    this.bonusMres = 0;
    this.totalMres = this.baseMres + this.totalMres;
    this.baseMoveSpeed = moveSpeed;
    this.bonusMoveSpeed = 0;
    this.baseMoveSpeed + this.bonusMoveSpeed;
    this.baseAD = baseAD + (this.ADScaling * (this.level - 1));
    this.ADscaling = ADscaling;
    this.baseAS = baseAS;
    this.aSpeedScaling = aSpeedScaling
    this.level = 1;
    this.abilityHaste = 0;
    this.manaRegen = 0;
    this.Tenacity = 0
  }
}


Champion.prototype.setLevel = function(num) {
  if (num >=15) {this.level = 15}
  else if (num <=1) {this.level = 1}
  else {this.level = num};
};

Champion.prototype.getStat = function(stat = 'name') {
  return this[stat];
};
