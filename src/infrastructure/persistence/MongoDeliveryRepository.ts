// This file can be separated into different files, but for simplicity, we keep it all mongo-related things here.
import { Schema, model, connect } from 'mongoose';
import { DeliveryStatusValueObject } from '../../domain/value-objects/DeliveryStatusValueObject';
import { ProviderValueObject } from '../../domain/value-objects/ProviderValueObject';
import { DeliveryRepositoryInterface } from '../../domain/interfaces/DeliveryRepositoryInterface';
import { FINAL_DELIVERY_STATUSES } from '../../domain/constants';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';
import NotFoundError from '../../shared/errors/NotFoundError';

const DeliverySchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    label: { type: String },
    trackingNumber: { type: String },
    deliveryDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: Object.values(DeliveryStatusValueObject),
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderValueObject),
    },
  },
  {
    timestamps: true,
  }
);

const DeliveryModel = model('Delivery', DeliverySchema);

class MongoDeliveryRepository implements DeliveryRepositoryInterface {

  async create(delivery: DeliveryEntity): Promise<void> {
    const newDelivery = new DeliveryModel(delivery);
    await newDelivery.save();
  }

  async find(reference: string): Promise<DeliveryEntity> {
    const doc = await DeliveryModel.findOne({ $or: [{ id: reference }, { trackingNumber: reference }] }).exec();
    if (!doc) throw new NotFoundError('Delivery not found');

    return new DeliveryEntity(
      doc.id,
      doc.status as DeliveryStatusValueObject,
      doc.deliveryDate || undefined,
      doc.label || undefined,
      doc.trackingNumber || undefined,
      doc.provider as ProviderValueObject || undefined,
    );
  }

  async findAllActive(): Promise<DeliveryEntity[]> {
    const docs = await DeliveryModel.find({ status: { $nin: FINAL_DELIVERY_STATUSES }, provider: { $exists: true, $ne: null }, trackingNumber: { $exists: true, $ne: null } });
    return docs.map(doc => new DeliveryEntity(
      doc.id,
      doc.status as DeliveryStatusValueObject,
      doc.deliveryDate || undefined,
      doc.label || undefined,
      doc.trackingNumber || undefined,
      doc.provider as ProviderValueObject || undefined,
    ));
  }

  async updateById(deliveryId: string, delivery: DeliveryEntity): Promise<void> {
    await DeliveryModel.updateOne({ id: deliveryId }, delivery, { runValidators: true, new: true });
  }
}

async function connectToMongo() {
  const uri: string = 'mongodb://localhost:27017/prueba_tenica_marc_serra';
  try {
    await connect(uri, { dbName: 'delivery_db' });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

export { MongoDeliveryRepository, connectToMongo };