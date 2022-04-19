import User from "../dbModels/userModel";
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
        const user = await User.findById({ _id: req.body.id });
    
        if (!user) {
            res.status(NOT_FOUND).json({ payload: ReasonPhrases.NOT_FOUND });
        }
    
        const tickets = await Ticket.find({ user });
        res.status(OK).json({ payload: tickets });
        
    } catch (error) {
        logger.err(error.message);
        res.status(BAD_REQUEST).json({ payload: error.message });
    }
};

/**
 *
 * @desc   Get a ticket
 * @access "private"
 * @route  GET /api/ticket/ticketId
 */
export const getTicket = async (req: Request, res: Response) => {
    try {
        const ticket = await Ticket.findById({ _id: req.params.id });
    
        if (!ticket) {
            res.status(NOT_FOUND).json({ payload: ReasonPhrases.NOT_FOUND });
        }

        if (ticket.user != req.body.id) {
            res.status(UNAUTHORIZED).json({ payload: ReasonPhrases.UNAUTHORIZED });
        }
    
        res.status(OK).json({ payload: ticket });
        
    } catch (error) {
        logger.err(error.message);
        res.status(BAD_REQUEST).json({ payload: error.message });
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
            res.status(NOT_FOUND).json({ payload: ReasonPhrases.NOT_FOUND });
        }

        if (ticket.user != req.body.id) {
            res.status(UNAUTHORIZED).json({ payload: ReasonPhrases.UNAUTHORIZED });
        }

        await Ticket.deleteOne({ _id: ticket._id });
    
        res.status(OK).json({ payload: ticket._id });
        
    } catch (error) {
        logger.err(error.message);
        res.status(BAD_REQUEST).json({ payload: error.message });
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
        const ticket = await Ticket.findById({ _id: req.params.id });
    
        if (!ticket) {
            res.status(NOT_FOUND).json({ payload: ReasonPhrases.NOT_FOUND });
        }

        if (ticket.user != req.body.id) {
            res.status(UNAUTHORIZED).json({ payload: ReasonPhrases.UNAUTHORIZED });
        }

        const updated = await Ticket.findByIdAndUpdate({ _id: ticket._id });
    
        res.status(OK).json({ payload: updated });
        
    } catch (error) {
        logger.err(error.message);
        res.status(BAD_REQUEST).json({ payload: error.message });
    }
};

/**
 *
 * @desc   Create a ticket
 * @access "private"
 * @route  POST /api/ticket/new
 */
export const createTicket = async (req: Request, res: Response) => {
    try {
        const { product, description, id } = req.body;
    
        if (!product || !description) {
            res.status(BAD_REQUEST).json({ payload: ReasonPhrases.BAD_REQUEST });
        }
    
        const user = await User.findById({ _id: id });
    
        if (!user) {
          res.status(NOT_FOUND).json({ payload: ReasonPhrases.NOT_FOUND });
        }
    
        const newTicket = await Ticket.create({
            product,
            description,
            user,
            status: "new"
        });
    
        res.status(CREATED).json({ payload: newTicket.id });
        
    } catch (error) {
        logger.err(error.message);
        res.status(BAD_REQUEST).json({ payload: error.message });
    }
};