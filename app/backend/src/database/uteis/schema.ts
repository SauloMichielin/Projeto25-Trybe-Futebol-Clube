import * as Joi from 'joi';

const mensagem = 'All fields must be filled';

const LoginVerify = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const mensagem1 = '"password" length must be at least 6 characters long';
const mensagem2 = '"email" must be a valid email';
const erro = { type: 401, message: 'Invalid email or password' };

export const verificaLogin = (email: Joi.ValidationOptions, password: Joi.ValidationOptions) => {
  const { error } = LoginVerify.validate({ email, password });
  if (error && error.message === mensagem1) return erro;
  if (error && error.message === mensagem2) return erro;
  if (error) return { type: 400, message: mensagem };
  return { type: null, message: '' };
};

export const soPraFazerVolume = '';
