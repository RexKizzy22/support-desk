import Ticket from "src/dbModels/ticketModel";
import { Request, Response } from "express";
import StatusCodes, { ReasonPhrases } from "http-status-codes";
import logger from "jet-logger";

const { OK, NOT_FOUND, BAD_REQUEST, CREATED, UNAUTHORIZED } = StatusCodes;

/**
 *
 * @desc   Get all tickets
 * @access "private"
 * @route  GET /api/tickets
 */
export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id });

    return res.status(OK).json(tickets);
  } catch (error) {
    logger.err(error.message);
    return res.status(BAD_REQUEST).json({ payload: error.message });
  }
};

/**
 *
 * @desc   Get a ticket
 * @access "private"
 * @route  GET /api/tickets/ticketId
 */
export const getTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById({ _id: req.params.id });

    if (!ticket) {
      return res.status(NOT_FOUND).json({ payload: ReasonPhrases.NOT_FOUND });
    }

    if (ticket.user.toString() !== req.user.id?.toString()) {
      return res
        .status(UNAUTHORIZED)
        .json({ payload: ReasonPhrases.UNAUTHORIZED });
    }

    return res.status(OK).json(ticket);
  } catch (error) {
    logger.err(error.message);
    return res.status(BAD_REQUEST).json({ payload: error.message });
  }
};

/**
 *
 * @desc   Delete a ticket
 * @access "private"
 * @route  DELETE /api/ticket/ticketId
 */
export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById({ _id: req.params.id });

    if (!ticket) {
      return res.status(NOT_FOUND).json({ payload: ReasonPhrases.NOT_FOUND });
    }

    if (ticket.user.toString() != req.user.id?.toString()) {
      return res
        .status(UNAUTHORIZED)
        .json({ payload: ReasonPhrases.UNAUTHORIZED });
    }

    await Ticket.deleteOne({ _id: ticket._id });

    return res.status(OK).json({ payload: ticket._id });
  } catch (error) {
    logger.err(error.message);
    return res.status(BAD_REQUEST).json({ payload: error.message });
  }
};

/**
 *
 * @desc   Update a ticket
 * @access "private"
 * @route  PUT /api/ticket/ticketId
 */
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(NOT_FOUND).json({ payload: ReasonPhrases.NOT_FOUND });
    }

    if (ticket.user.toString() != req.user.id?.toString()) {
      return res
        .status(UNAUTHORIZED)
        .json({ payload: ReasonPhrases.UNAUTHORIZED });
    }

    const updated = await Ticket.findByIdAndUpdate(
      { _id: ticket._id },
      req.body,
      { new: true }
    );

    return res.status(OK).json({ payload: updated });
  } catch (error) {
    logger.err(error.message);
    return res.status(BAD_REQUEST).json({ payload: error.message });
  }
};

/**
 *
 * @desc   Create a ticket
 * @access "private"
 * @route  POST /api/tickets
 */
export const createTicket = async (req: Request, res: Response) => {
  try {
    const { product, description } = req.body;

    if (!product || !description) {
      return res
        .status(BAD_REQUEST)
        .json({ payload: ReasonPhrases.BAD_REQUEST });
    }

    const newTicket = await Ticket.create({
      product,
      description,
      user: req.user.id,
      status: "new",
    });

    return res.status(CREATED).json({ payload: newTicket.id });
  } catch (error) {
    logger.err(error.message);
    return res.status(BAD_REQUEST).json({ payload: error.message });
  }
};
