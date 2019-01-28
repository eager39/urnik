
module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'dev':
            return {DBuser:"root",DBpass:"",database:"urnik"};

        case 'prod':
            return {DBuser:"nodejsShared",DBpass:"",database:"nodejsAcademiaUrnik"};

        default:
            return  {DBuser:"root",DBpass:""};
    }
};