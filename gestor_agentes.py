"""Gestor de agentes del proyecto.

Uso en PowerShell (las comillas evitan la expansion de @):
    python gestor_agentes.py "@indice"
    python gestor_agentes.py "@testing"
    python gestor_agentes.py "@deploy"
    python gestor_agentes.py "@backend"
    python gestor_agentes.py "@documentation"

Los alias descriptivos muestran su agente. Este script no genera codigo de
dominio automaticamente. Los alias operativos ejecutan:
    @testing  -> mvn test en backend y npm test en frontend si existe Angular
    @deploy   -> mvn clean package en backend y npm run build si frontend es Angular
    @backend  -> mvn spring-boot:run en backend
"""

from __future__ import print_function

import io
import os
import subprocess
import sys


ROOT = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(ROOT, "docs", "index.prompts")


def cargar_indice():
    """Devuelve {alias: (descripcion, ruta_absoluta)} desde docs/index.prompts."""
    agentes = {}
    with io.open(INDEX_PATH, "r", encoding="utf-8") as indice:
        for numero, linea in enumerate(indice, 1):
            texto = linea.strip()
            if not texto or texto.startswith("#"):
                continue
            if ":" not in texto or "->" not in texto:
                raise ValueError("Linea invalida en indice: {0}".format(numero))
            alias, resto = texto.split(":", 1)
            descripcion, ruta = resto.split("->", 1)
            agentes[alias.strip()] = (
                descripcion.strip(),
                os.path.join(ROOT, ruta.strip().replace("/", os.sep)),
            )
    return agentes


def mostrar_indice(agentes):
    print("Alias disponibles:")
    for alias in sorted(agentes):
        descripcion, ruta = agentes[alias]
        print("  {0}: {1} -> {2}".format(
            alias, descripcion, os.path.relpath(ruta, ROOT)))
    print("  @indice: Mostrar esta lista")


def mostrar_agente(alias, ruta):
    if not os.path.isfile(ruta):
        raise IOError("No existe el archivo del agente: {0}".format(ruta))
    print("\nInstrucciones de {0} ({1}):\n".format(
        alias, os.path.relpath(ruta, ROOT)))
    with io.open(ruta, "r", encoding="utf-8") as agente:
        print(agente.read().rstrip())


def ejecutar(comando, carpeta):
    print("\nEjecutando en {0}: {1}".format(
        os.path.relpath(carpeta, ROOT), " ".join(comando)))
    sys.stdout.flush()
    return subprocess.call(comando, cwd=carpeta)


def herramienta(nombre):
    """Obtiene el lanzador correcto para herramientas instaladas por scripts."""
    return nombre + ".cmd" if os.name == "nt" else nombre


def ejecutar_alias(alias):
    backend = os.path.join(ROOT, "backend")
    frontend = os.path.join(ROOT, "frontend")
    if alias == "@testing":
        codigo = ejecutar([herramienta("mvn"), "test"], backend)
        if codigo != 0:
            return codigo
        package_json = os.path.join(frontend, "package.json")
        if os.path.isfile(package_json):
            return ejecutar(
                [herramienta("npm"), "test", "--", "--watch=false"], frontend)
        return 0
    if alias == "@backend":
        return ejecutar([herramienta("mvn"), "spring-boot:run"], backend)
    if alias == "@deploy":
        codigo = ejecutar([herramienta("mvn"), "clean", "package"], backend)
        if codigo != 0:
            return codigo
        package_json = os.path.join(frontend, "package.json")
        if os.path.isfile(package_json):
            return ejecutar([herramienta("npm"), "run", "build"], frontend)
        print("\nFrontend sin package.json: se omite npm run build.")
    return 0


def main(argumentos):
    try:
        agentes = cargar_indice()
    except (IOError, ValueError) as error:
        print("Error al cargar el indice: {0}".format(error), file=sys.stderr)
        return 1
    if len(argumentos) != 2:
        print("Uso: python gestor_agentes.py @alias", file=sys.stderr)
        mostrar_indice(agentes)
        return 1
    alias = argumentos[1]
    if alias == "@indice":
        mostrar_indice(agentes)
        return 0
    if alias not in agentes:
        print("Alias no definido: {0}".format(alias), file=sys.stderr)
        mostrar_indice(agentes)
        return 1
    mostrar_agente(alias, agentes[alias][1])
    sys.stdout.flush()
    return ejecutar_alias(alias)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
