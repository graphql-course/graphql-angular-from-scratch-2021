import { IPeople } from "../../interfaces/people-interface";
import { IResolvers } from "@graphql-tools/utils";
import data from "../../data";

const mutationPeopleResolvers: IResolvers = {
  Mutation: {
    addPeople: (
      _: void,
      args: { people: IPeople }
    ): {
      status: boolean;
      message: string;
      item?: IPeople;
    } => {
      // Validamos si el título existe en uno de los libros existentes (DUPLICADO)
      if (
        data.people.filter((value) => value.name === args.people.name).length > 0
      ) {
        return {
          status: false,
          message: "La persona que estás introduciendo ya existe. Prueba con otro por favor",
        };
      }
      const idValue = +data.people[data.people.length - 1].id + 1;
      args.people.id = String(idValue);
      (data.people as IPeople[]).push(args.people);
      return {
        status: true,
        message: `Persona con el nombre ${args.people.name} ha sido añadido correctamente`,
        item: args.people,
      };
    },
    updatePeople: (
      _: void,
      args: { people: IPeople }
    ): {
      status: boolean;
      message: string;
      item?: IPeople;
    } => {
      // Buscamos si el libro existe
      if (
        data.people.filter((peopleItem: IPeople) => peopleItem.id === args.people.id)
          .length === 0
      ) {
        return {
          status: false,
          message:
            "El libro que estás introduciendo no existe y no puedes actualizarlo. Revisa que ese id sea el correcto",
        };
      }

      // Actualizamos el libro cuando lo encontremos
      for (let i = 0; i < data.books.length; i++) {
        if (data.books[i].id === args.people.id) {
          (data.people[i] as IPeople) = args.people;
          break;
        }
      }
      return {
        status: true,
        message: "Actualizado correctamente la persona seleccionada",
        item: args.people,
      };
    },
    deletePeople: (
      _: void,
      args: { id: string }
    ): {
      status: boolean;
      message: string;
    } => {
      let deleteItem = false;
      for (let i = 0; i < data.people.length; i++) {
        if (data.people[i].id === args.id) {
          data.people.splice(i, 1);
          deleteItem = true;
          break;
        }
      }
      return {
        status: deleteItem,
        message: deleteItem ? "Eliminado" : "No se ha eliminado ninguna persona",
      };
    },
  },
};

export default mutationPeopleResolvers;
