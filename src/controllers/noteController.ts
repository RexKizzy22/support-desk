import Ticket from "../dbModels/ticketModel";
import Note from "../dbModels/notesModel";
import { Request, Response } from "express";
import StatusCodes, { ReasonPhrases } from "http-status-codes";
import logger from "jet-logger";

const { OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;

/**
 *
 * @desc   Get all notes for a ticket
 * @access Private
 * @route  GET /api/tickets/:ticketId/notes
 */
export const getNotes = async (
  req: Request,
  res: Response
) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket?.user.toString() !== req.user.id?.toString()) {
      return res.status(UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    return res.status(OK).json(notes);
  } catch (error) {
    logger.err(error.message);
    return res.status(BAD_REQUEST).json(error.message);
  }
};

/**
 *
 * @desc   Create ticket note
 * @access Private
 * @route  POST /api/tickets/:ticketId/notes
 */
export const addNote = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket?.user.toString() !== req.user.id?.toString()) {
      return res.status(UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
    }

    const note = await Note.create({
      ticket: req.params.ticketId,
      user: req.user.id,
      isStaff: false,
      text: req.body.text,
    });

    return res.status(OK).json(note);
  } catch (error) {
    logger.err(error.message);
    return res.status(BAD_REQUEST).json(error.message);
  }
};
