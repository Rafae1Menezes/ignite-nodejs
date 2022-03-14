# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadasrar um carro com uma placada já existente.
O carro deve ser cadasrado, por padão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário adminstrador.

# Listagem de carros disponíveis

**RF**
Deve ser possível listar todos os carro disponíveis.
Deve ser possível listar todos os carro disponíveis pelo nome da categoria.
Deve ser possível listar todos os carro disponíveis pelo nome da marca.
Deve ser possível listar todos os carro disponíveis pelo nome do carro.

**RN**
O usuário não precisa esgtar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Nao eve ser possível cadastrar uma especificação para um carro.

**RN**
Não deve ser posível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário repsonsável pelo cadastro de ver um usuário adminstrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadasrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário repsonsável pelo cadastro de ver um usuário adminstrador.

## ALuguel

**RF**
Deve se possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.s