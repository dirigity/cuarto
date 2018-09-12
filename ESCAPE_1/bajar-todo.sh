#!/bin/bash

PREFIJO="http://www.ludomath.es/MathEscape/ESCAPE_1/"

ficheros_a_bajar(){
    cat ./www.ludomath.es.har | grep '"url"' | awk '{print $2}' | tr -d '"' | tr -d ','
}

nombre_fichero(){
   echo ${1#"$PREFIJO"}
}

for f in $(ficheros_a_bajar)
do
    NOMBREFICHERO=$(nombre_fichero $f)
    DIRECTORIO=$(dirname $NOMBREFICHERO)
    echo $f "-->" $NOMBREFICHERO "-->" $DIRECTORIO
    mkdir -p $DIRECTORIO
    wget -S -O $NOMBREFICHERO $f
done;

wget -S -O img/system/GameOver.png $PREFIJO/img/system/GameOver.png
