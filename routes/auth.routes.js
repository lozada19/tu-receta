const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const UserModel = require("../models/User.model")

//---------- Iniciar session

router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs")
}) 

router.post("/signup", async (req, res, next ) => {

    const { username, email, password } = req.body

    // Validar

    if( !username || !email || !password ) {
        res.render("auth/signup.hbs", {
            errorMessage: "Debe rellenar todos los campos"
        })
        return
    }

    // validar contaseña

    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ 

     if(passwordRegex.test(password) === false){
        res.render("auth/signup",{
            errorMessage: "Contraseña no valida, debes tener 8 caracteres, 1 letra, 1 numero "
        })
        return
    }

    try {
        
        // crear un usiario

        const foundUser = await UserModel.findOne({$or: [{username: username}, {email: email}]})
         if(foundUser !== null){
            res.render("auth/signup", {
                errorMessage: "Usuario ya resgistrado"
            })
            return
        }

        // Encriptar la contaseña

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        // usuario en base de datos

        await UserModel.create({
            username,
            email,
            password: hashPassword
        })

        res.redirect("/auth/login")
        
    } catch (error) {
        next(err)
    }




    

    
 })

module.exports = router