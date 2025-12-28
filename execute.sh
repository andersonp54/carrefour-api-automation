#!/bin/bash
listMenu=('Users' 'Products')
listEnv=('dev' 'hmg')

echo " "
echo "Qual o Environment para execução: "
select env in "${listEnv[@]}";
do 
  export NODE_ENV=$env
break;
done
