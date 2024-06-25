    const validator = {
        nom: {
            rules: [
                {
                    test: /^[a-z0-9_]+$/,
                    message: 'Votre nom doit comporté uniquement des l\'ettre alphabetique',
                },
                {
                    test: (value) => {
                        if (value === '') return true;
                      return value.length > 2;
                    },
                    message: 'Votre nom doit comporté un minimum de 2 caracter',
                  },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        prenom: {
            rules: [
                {
                    test: /^[a-z0-9_]+$/,
                    message: 'Votre prenom doit comporté uniquement des l\'ettre alphabetique',
                },
                {
                    test: (value) => {
                        if (value === '') return true;
                      return value.length > 2;
                    },
                    message: 'Votre prenom doit comporté un minimum de 2 caracter',
                  },
            ],
            errors: [],
            valid: false,
            state: '',
        },
        email: {
            rules: [
              {
                test: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "L'adresse email est incorect"
              },
            ],
            errors: [],
            valid: false,
            state: ''
          },
        password: {
            rules: [
              {
                test: (value) => {
                    if (value === '') return true;
                  return value.length >= 6;
                },
                message: 'Votre mot de passe doit comporté un minimum de 6 caracter',
              },
              {
                confirm: (value, valueVerif) => {
                    return value === valueVerif;
                },
                message: "les deux champ password doive corespondre",
              }
            ],
            errors: [],
            valid: false,
            state: ''
          },
          confirmPassword: {
            rules: [],
            errors: [],
            valid: false,
            state: ''
          },
    }
export default validator;