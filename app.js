new Vue({
    el: '#app',
    data:{
        jogador:100,
        monstro: 100,
        ataques: [],
        controle: '',
        barra: '',
        vidaJogador: `${this.jogador}%`,
        vidaMonstro: `${this.monstro}%`,
        iniciarJogo: true,
        log: true
    },
    methods:{
        ataqueMonstro(){  
            var ataqueMonstro = Math.floor(Math.random()*(14-7)+7)
            if(this.jogador <= 0 || this.jogador - ataqueMonstro <= 0){
                this.jogador = 0
                return this.controle = 'Você Perdeu :('
            }else{
                this.jogador = this.jogador - ataqueMonstro
                this.vidaJogador = `${this.jogador}%`
                return this.registerLog('O monstro atacou com o poder de '+ataqueMonstro, 'monsterLog')         
            }
        },
        ataqueJogador(){
            var ataqueJogador = Math.floor(Math.random()*(10-1)+1)
            if(this.monstro <= 0 || this.monstro - ataqueJogador <= 0){
                this.monstro = 0
                return this.controle = 'Você Ganhou :)'
            }else{
                this.monstro = this.monstro - ataqueJogador
                this.vidaMonstro = `${this.monstro}%`
                return this.registerLog(`O jogador atacou com poder de ${ataqueJogador} `, 'jogadorLog')
            }
        },
        ataqueSemEspecial(){
           this.ataqueMonstro()
           this.ataqueJogador()
            
        },
        ataqueEspecialJogador(){
            var btnAtaqueEspecial = Math.floor(Math.random()*(19-10)+10)
            if(this.monstro < 0 || this.monstro - btnAtaqueEspecial < 0){
                this.monstro = 0
                return this.controle  = 'Você ganhou :)'
            }else{
                this.monstro = this.monstro - btnAtaqueEspecial
                this.vidaMonstro = `${this.monstro}%`
                this.registerLog(`O jogador atacou com poder especial de ${btnAtaqueEspecial} `, 'jogadorLog')
            }
        },
        ataqueEspecial(){
            this.ataqueMonstro()
            this.ataqueEspecialJogador()
        },
        curar(){
            var cura = Math.floor(Math.random()*(19-10)+10)
            if(this.jogador >= 100 || this.jogador + cura >= 100){
                return this.jogador = 100
            }else{
                this.jogador = this.jogador + cura            
                this.ataqueMonstro()
                return this.registerLog('O jogador curou com energia de '+ cura, 'jogadorLog')
            }
        },
        btnCura(){
            this.curar()
            // this.ataqueMonstro()
        },
        btnDesistir(){
            this.jogador = 100
            this.monstro = 100
            this.ataques = []
            this.controle = ''
            this.iniciarJogo = true
            this.vidaJogador = `${100}%`
            this.vidaMonstro = `${100}%`
        },
        registerLog(text, cls){
            this.ataques.unshift({text, cls})
        }
    },
    watch:{
        ataques(val){
            this.ataques = val
            this.log = !this.log
        },
        vida(val){
            this.vida =val
        },
        vidaJogador(val){
            this.vidaJogador = val
        },
        vidaMonstro(val){
            this.vidaMonstro = val
        }
    },
    computed:{
        verificarControle(){
            return this.jogador == 0 || this.monstro == 0 ? true : false
        }
    }

})