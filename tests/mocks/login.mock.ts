const validPassword = 'terrível';
const validUsername = 'Hagar';
const hashPassword = '$2a$10$paFEwO0ys8IeyxvgLA53Ue.Eqb7KNclcXE3cuuNmnL0rwWZE.hfJ6';

  const existingUserWithHash = {
    id:1,
  username: validUsername, 
  vocation:'Guerreiro',
  level: 10,
  password: hashPassword,
}
  const invalidPasswordBody = {username: validUsername, password: 'invalid_password'}

  const invalidUsernameBody = {username: 'invalid_username', password: validPassword}

  const validLoginBody = {username: validUsername, password: validPassword}

  const emptyPasswordBody = {username: validUsername, password: ''}

  const emptyUsernameBody = {username: '', password: validPassword}

  const messageInvalidLoginOrPassword = { message: 'Username or password invalid' }

export default {
    invalidPasswordBody,
    validLoginBody,
    emptyPasswordBody,
    emptyUsernameBody,
    existingUserWithHash,
    invalidUsernameBody,
    messageInvalidLoginOrPassword
}