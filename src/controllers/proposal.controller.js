import * as salesModel from "../models/sale.model.js";
import * as proposalModel from "../models/proposal.model.js";
import * as licitationModel from "../models/licitations.model.js";
import { v4 as uuidv4 } from "uuid";

export const createSaleProposal = async (req, res) => {
    try {
        const licitation_id = req.params.id;
        const user_id = req.user_id;
        const proposal_id = uuidv4();

        const fetchLicitation = await licitationModel.getLicitationById(licitation_id);

        if(fetchLicitation.id_usuario == user_id){
            throw new Error("No puedes crear una oferta de venta a ti mismo");
        }

        const insertProposal = await proposalModel.createSaleProposal(proposal_id, licitation_id, user_id, req.body);

        if(insertProposal > 0){
            return res.status(200).send({message: `Oferta de venta realizada con exito`});
        }

        throw new Error("La creacion de la oferta de venta ha fallado, intenta nuevamente")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const getSaleProposalById = async (req, res) => {
    try {
        const proposal = await proposalModel.getSaleProposalById(req.params.id);

        if(proposal) {
            return res.status(200).json(proposal);
        }

        throw new Error("La obtención de la oferta de venta ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const getSaleProposalByUser = async (req, res) => {
    try {
        const userProposals = await proposalModel.getSaleProposalByUser(req.user_id);

        if(userProposals) {
            return res.status(200).json(userProposals);
        }

        throw new Error("La obtención de las ofertas de venta ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


// Propuestas de Compras a Ventas


export const createLicitationProposal = async (req, res) => {
    try {
        const sale_id = req.params.id;
        const user_id = req.user_id;
        const proposal_id = uuidv4();
        
        const fetchSale = await salesModel.getSalesById(sale_id);

        if(fetchSale.id_usuario == user_id){
            throw new Error("No puedes crear una oferta de compra a ti mismo");
        }

        const insertProposal = await proposalModel.createLicitationProposal(proposal_id, sale_id, user_id, req.body);

        if(insertProposal > 0){
            return res.status(200).send({message: `Oferta de compra realizada con exito`});
        }

        throw new Error("La creacion de la oferta de compra ha fallado, intenta nuevamente")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const getLicitationProposalById = async (req, res) => {
    try {
        const proposal = await proposalModel.getLicitationProposalById(req.params.id);

        if(proposal) {
            return res.status(200).json(proposal);
        }

        throw new Error("La obtención de la oferta de compra ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const getLicitationProposalByUser = async (req, res) => {
    try {
        const userProposals = await proposalModel.getLicitationProposalByUser(req.user_id);

        if(userProposals) {
            return res.status(200).json(userProposals);
        }

        throw new Error("La obtención de las ofertas de compra ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
