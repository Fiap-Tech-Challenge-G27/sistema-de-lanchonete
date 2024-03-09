// Importa o AWS SDK
const AWS = require('aws-sdk');

// Configura a região do AWS SDK
AWS.config.update({region: 'us-east-1'});

// Cria uma instância do serviço Cognito Identity Provider
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    // Define os parâmetros para adicionar um usuário
    const params = {
        UserPoolId: 'us-east-1_iiAHicBzt',
        Username: '23570549054', // CPF de teste
        UserAttributes: [
            {
                Name: 'email', // Substitua conforme necessário
                Value: 'kaio411@hotmail.com' // E-mail de teste
            },
            {
                Name: 'custom:cpf',
                Value: '23570549054' // CPF de teste
            }
        ],
        MessageAction: 'SUPPRESS', // Suprime o envio de e-mails de boas-vindas
    };

    try {
        // Tenta adicionar o usuário ao User Pool do Cognito
        await cognito.adminCreateUser(params).promise();
        console.log('Usuário adicionado com sucesso');
    } catch (error) {
        console.error('Erro ao adicionar o usuário:', error);
        throw error;
    }
};
