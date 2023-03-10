CREATE TABLE jornadas(
    fecha DATETIME NOT NULL PRIMARY KEY
);

CREATE TABLE ciudad (
    nombre VARCHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE grupo (
    letraGrupo VARCHAR(1) NOT NULL PRIMARY KEY
);

CREATE TABLE confederacion(
	nombreConf VARCHAR(50) NOT NULL PRIMARY KEY,
    continente VARCHAR(50) NOT NULL, 
    siglasConf VARCHAR(3) NOT NULL UNIQUE
);

CREATE TABLE pais(
    codPais VARCHAR(3) NOT NULL PRIMARY KEY,
    nombrePais VARCHAR(50) NOT NULL UNIQUE,
    nombreConf VARCHAR(50) NOT NULL,
    FOREIGN KEY(nombreConf) REFERENCES confederacion(nombreConf),
    letraGrupo VARCHAR(50),
    FOREIGN KEY(letraGrupo) REFERENCES grupo(letraGrupo)
);

CREATE TABLE estadio(
    codEstadio INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    ubicacion VARCHAR(50) NOT NULL,
    nombreEstadio VARCHAR(50) NOT NULL,
    capacidad INT NOT NULL,
    nombreCiudad VARCHAR(50) NOT NULL, 
    FOREIGN KEY(nombreCiudad) REFERENCES ciudad(nombre)
);

CREATE TABLE arbitro(
    codArbitro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreArbitro VARCHAR(50) NOT NULL,
    codPais VARCHAR(3) NOT NULL,
    FOREIGN KEY(codPais) REFERENCES pais(codPais)
);

CREATE TABLE partido(
    codPartido INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    FOREIGN KEY(fecha) REFERENCES jornadas(fecha),
    codEstadio INT NOT NULL,
    FOREIGN KEY(codEstadio) REFERENCES estadio(codEstadio)
);

CREATE TABLE hotel (
    codHotel INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombreHotel VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL
);

CREATE TABLE telefonos (
    numTelefono INT NOT NULL,
    codHotel INT NOT NULL,
    FOREIGN KEY(codHotel) REFERENCES hotel(codHotel),
    PRIMARY KEY(numTelefono, codHotel)
);

CREATE TABLE arbitran (
    codArbitro INT NOT NULL,
    FOREIGN KEY(codArbitro) REFERENCES Arbitro(codArbitro),
    codPartido INT NOT NULL,
    FOREIGN KEY(codPartido) REFERENCES partido(codPartido),
    PRIMARY KEY(codArbitro, codPartido)
);

CREATE TABLE equipo(
    codEquipo VARCHAR(3) NOT NULL,
    FOREIGN KEY(codEquipo) REFERENCES pais(codPais),
    PRIMARY KEY(codEquipo),
    esloganEquipo VARCHAR(50) NOT NULL,
    nombreDT VARCHAR(50) NOT NULL
);



CREATE TABLE juegan(
    codPartido INT NOT NULL,
    FOREIGN KEY(codPartido) REFERENCES partido(codPartido),
    codEquipo1 VARCHAR(3) NOT NULL,
    FOREIGN KEY(codEquipo1) REFERENCES equipo(codEquipo),
    codEquipo2 VARCHAR(3) NOT NULL,
    FOREIGN KEY(codEquipo2) REFERENCES equipo(codEquipo),
    PRIMARY KEY(codPartido)
);

CREATE TABLE coloresUniforme (
    codEquipo VARCHAR(3) NOT NULL,
    FOREIGN KEY(codEquipo) REFERENCES equipo(codEquipo),
    clocal VARCHAR(10) NOT NULL, 
    cvisitante VARCHAR(10) NOT NULL
);

CREATE TABLE alojan(
    codHotel INT NOT NULL,
    FOREIGN KEY(codHotel) REFERENCES hotel(codHotel),
    codEquipo VARCHAR(3) NOT NULL,
    FOREIGN KEY (codEquipo) REFERENCES equipo(codEquipo),
    codPartido INT NOT NULL, 
    FOREIGN KEY(codPArtido) REFERENCES partido(codPartido),
    PRIMARY KEY(codHotel, codEquipo, codPartido)
);

CREATE TABLE jugador(
    codJugador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreJugador VARCHAR(50) NOT NULL,
    aliasJugador VARCHAR(50), 
    posicionJugador VARCHAR(50) NOT NULL,
    nroCamisa INT NOT NULL,
    fechaNac DATE NOT NULL, 
    codEquipo VARCHAR(3) NOT NULL,
    FOREIGN KEY(codEquipo) REFERENCES equipo(codEquipo)  
);

CREATE TABLE estadisticasIndividuales (
    codJugador INT NOT NULL,
    FOREIGN KEY(codJugador) REFERENCES jugador(codJugador),
    codPartido INT NOT NULL,
    FOREIGN KEY(codPartido) REFERENCES partido(codPartido),
    PRIMARY KEY(codJugador, codPartido),
    ataque INT NOT NULL,
    defensa INT NOT NULL,
    pases INT NOT NULL,
    golesAnotados INT NOT NULL,
    asistencias INT NOT NULL,
    autogoles INT NOT NULL,
    penaltis INT NOT NULL,
    tarjetasAmarillas INT NOT  NULL,
    tarjetasRojas INT NOT NULL
);

CREATE TABLE estadisticasPortero (
    codJugador INT NOT NULL,
    FOREIGN KEY(codJugador) REFERENCES jugador(codJugador),
    codPartido INT NOT NULL,
    FOREIGN KEY(codPartido) REFERENCES partido(codPartido),
    PRIMARY KEY(codJugador, codPartido),
    disparosAtajados INT NOT NULL,
    disparosDesviados INT NOT NULL,
    golesRecibidos INT NOT NULL,
    penaltisAtajados INT NOT NULL
  
);

CREATE TABLE estadisticasGenerales (
    codEquipo VARCHAR(3) NOT NULL,
    FOREIGN KEY(codEquipo) REFERENCES equipo(codEquipo),
    codPartido INT NOT NULL,
    FOREIGN KEY(codPartido) REFERENCES partido(codPartido),
    PRIMARY KEY(codEquipo, codPartido),
    posesionBalon INT NOT NULL,
    tirosArco INT NOT NULL,
    tirosArcoAcertados INT NOT NULL,
    tirosArcoFallados INT NOT NULL,
    tiroSEsquina INT NOT NULL,
    atajadasPortero INT NOT NULL,
    pases INT NOT NULL,
    pasesCortos INT NOT NULL,
    pasesLargos INT NOT NULL,
    entradas INT NOT NULL
);

CREATE TABLE eliminatorias(
    codPais VARCHAR(3) NOT NULL PRIMARY KEY,
    FOREIGN KEY(codPais) REFERENCES pais(codPais),
    juegos_ganados INT NOT NULL,
    juegos_perdidos INT NOT NULL,
    goles_a_favor INT NOT NULL,
    goles_en_contra INT NOT NULL,
    clasificacion VARCHAR(255)
);

ALTER TABLE equipo
ADD CONSTRAINT equipo_cascade
FOREIGN KEY (codEquipo) REFERENCES pais (codPais)
ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE pais
ADD CONSTRAINT pais_cascade_confederacion
FOREIGN KEY (nombreConf) REFERENCES confederacion (nombreConf)
ON DELETE CASCADE ON UPDATE CASCADE; 
ALTER TABLE pais
ADD CONSTRAINT pais_cascade_grupo 
FOREIGN KEY (letraGrupo) REFERENCES grupo (letraGrupo)
ON DELETE CASCADE ON UPDATE CASCADE;



ALTER TABLE coloresUniforme
ADD CONSTRAINT colores_cascade
FOREIGN KEY (codEquipo) REFERENCES equipo (codEquipo)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE juegan
ADD CONSTRAINT juegan_cascade
FOREIGN KEY (codPartido) REFERENCES partido (codPartido)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE jugador
ADD CONSTRAINT jugador_cascade
FOREIGN KEY(codEquipo) REFERENCES equipo(codEquipo)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE telefonos 
ADD CONSTRAINT telefonos_cascade
FOREIGN KEY (codHotel) REFERENCES hotel(codHotel)
ON DELETE CASCADE ON UPDATE CASCADE;