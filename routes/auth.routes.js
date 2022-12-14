const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User.model");

//----------------- REGISTRO -------------------//

router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validar

  if (username === "" || email === "" || password === "" ) {
    res.render("auth/signup.hbs", {
      errorMessage: "Debe rellenar todos los campos",
    });
    return;
  }

  // validar contaseña

  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (passwordRegex.test(password) === false) {
    res.render("auth/signup", {
      errorMessage:
        "Contraseña no valida, debes tener 8 caracteres, 1 letra, 1 numero ",
    });
    return;
  }

  try {
    // crear un usiario

    const foundUser = await UserModel.findOne({  // si el correo o nombre ya a sido usado 
      $or: [{ username: username }, { email: email }],
    });
    if (foundUser !== null) {
      res.render("auth/signup", {
        errorMessage: "Usuario ya resgistrado",
      });
      return;
    }

    // Encriptar la contaseña

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // usuario en base de datos

    await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    res.redirect("/auth/login");
  } catch (error) {
    next(err);
  }
});

// ------------------  INICIAR SESION    ------------------//
// Vista de Login

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// POST de login

router.post("/login", async (req, res, next) => {

  const { email, password } = req.body;

  // Validar si hay campos vacion
  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Debes rellenar todos los campos",
    });
    return;
  }

  try {
    // validar si el usuario esta en base de datos
    const newUser = await UserModel.findOne({ email: email });

    if (newUser === null) {
      res.render("auth/login", {
        errorMessage: "Lo sentimos, el usuario no esta registrado.",
      });
      return;
    }
    // validas contraseña
    const passwordCheck = await bcryptjs.compare(password, newUser.password);
    if (passwordCheck ===  false) {
      res.render("auth/login", {
        errorMessage: "Contraseña Incorrecta.",
      });
      return;
    }
    
    //crear sesion activa
    //en todas nuestras rutas siempre tendremos acceso a req.session.user
    req.session.user = {
        _id: newUser._id,
        email: newUser.email,
    }

    req.session.save(() => {
        res.redirect("/profile")
    })

  } catch (err) {
    next(err);
  }
     // permite al usuerio cerrar sesion 
  
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
      res.redirect("/")
  })
})



module.exports = router;
