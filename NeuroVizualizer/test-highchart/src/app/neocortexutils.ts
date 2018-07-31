import { NeoCortexModel, Area, Synapse, Minicolumn, Cell, neocortexSettings, InputModel } from './neocortexmodel';




export class neoCortexUtils {


  /**
   * 
   * @param areas 
   * @param minicolumns 
   * @param cellsInMinicolumn 
   */
  public static createModel(areas: number = 1, minicolumns: number[] = [1000, 3], cellsInMinicolumn: number = 6): NeoCortexModel {

    let inpModel : InputModel = new InputModel([3,3]);

    let sett: neocortexSettings = {numAreas: areas, minicolumnDims: minicolumns, numCellsInMinicolumn: cellsInMinicolumn, inputModel: inpModel };

    var model: NeoCortexModel = new NeoCortexModel(sett);

   // this.addSynapse
    return model;
  }


  public static addSynapse(model: NeoCortexModel, synapseId: number, areaId: number = -1, preCellId:number, postCellId:number, weight: number) {

    let synapse = this.lookupSynapse(model, synapseId, areaId);
    if (synapse != null) {
      synapse.permanence = weight;
    }
    else
      throw "Synapse cannot be found!";

  }

  public static updateSynapse(model: NeoCortexModel, synapseId: number, areaId: number = -1, weight: number) {

    let synapse = this.lookupSynapse(model, synapseId, areaId);
    if (synapse != null) {
      synapse.permanence = weight;
    }
    else
      throw "Synapse cannot be found!";

  }

  public static updateNeuron(model: NeoCortexModel, id: number, weight: number) {


  }


  /**
   * 
   * @param model 
   * @param synapseId 
   * @param [optional] areaId.
   */
  public static lookupSynapse(model: NeoCortexModel, synapseId: number, areaId: number = -1): Synapse {

    if (areaId >= 0 && model.areas.length > areaId)
      return this.lookupSynapseInArea(model, synapseId, areaId);

    model.areas.forEach(area => {
      let synapse = this.lookupSynapseInArea(model, synapseId, area.id);
      if (synapse != null)
        return synapse;
    });

    return null;
  }


  /**
   * 
   * @param model 
   * @param synapseId 
   * @param areaId 
   */
  private static lookupSynapseInArea(model: NeoCortexModel, synapseId: number, areaId: number): Synapse {

    model.areas[areaId].minicolumns.forEach(minColRow => {
      minColRow.forEach(miniColumn => {
        miniColumn.cells.forEach(cell => {
          cell.Synapses.forEach(synapse => {
            if (synapse.id == synapseId)
              return synapse;
          });
        });
      });
    });

    return null;
  }
}



