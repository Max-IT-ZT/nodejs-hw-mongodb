import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';
export const getAllContactsController = async (req, res, next) => {
  const data = await contactServices.getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);
  if (!data) {
    throw createHttpError(404, `Contact whith id=${id} not found`);
    //   const error = new Error(`Contact whith id=${id} not found`);
    //   error.status = 404;
    //   throw error;
    //   res.status(404).json({
    //     message: `Contact with id ${id} not found!`,
    //   });
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};
export const addContactController = async (req, res) => {
  const data = await contactServices.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact add successfully',
    data,
  });
};
export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await contactServices.updateContact(
    { _id: id },
    req.body,
    { upsert: true },
  );

  const status = isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: isNew
      ? 'Contact created successfully'
      : 'Contact updated successfully',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.updateContact({ _id: id }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact whith id=${id} not found`);
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};
export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.deleteContact({ _id: id });
  if (!data) {
    throw createHttpError(404, `Contact whith id=${id} not found`);
  }
  res.status(204).send();
};
