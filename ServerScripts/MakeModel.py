from MongoDB import Mongo_get_TAIEX_data
from MongoDB import mongo_url, client
import pymongo
import numpy as np, pandas as pd
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout
from keras.layers import Activation
from keras.optimizers import Adam
from keras.callbacks import EarlyStopping 
from keras.callbacks import ModelCheckpoint
import json

docs = pd.DataFrame.from_dict(
    Mongo_get_TAIEX_data(client=client))
taiex_values = docs.sort_values('Date')\
    .TAIEX.to_numpy()
train_X, train_Y = np.array(
    [(taiex_values[i:i + 9], taiex_values[i + 9]) 
    for i in range(110 - 10 + 1)]).T
train_X = np.stack(train_X)
train_Y = np.stack(train_Y)
Xav = np.mean(train_X, 0)
Yav = np.mean(train_Y, 0)
Xst, Yst = np.std(train_X, 0), np.std(train_Y, 0)
train_x = (train_X - Xav) / Xst
train_y = (train_Y - Yav) / Yst
np.savez_compressed('PredictModels/normalize', 
    Xav=Xav, Xst=Xst, Yav=Yav, Yst=Yst)

model = Sequential([Dense(1, input_shape=(9,))])
model.compile(Adam(lr=1e-3, decay=1e-5), 'mse')
model.fit(train_x, train_y, epochs=10000, 
    batch_size=16, 
    validation_split=0.1, 
    callbacks=[
        EarlyStopping(patience=50),
        ModelCheckpoint("PredictModels/Predictor.h5", save_best_only=True)])

model = load_model("PredictModels/Predictor.h5")
normalizers = np.load("PredictModels/normalize.npz")
Xav, Yav = normalizers['Xav'], normalizers['Yav']
Xst, Yst = normalizers['Xst'], normalizers['Yst']
pred_X = np.concatenate(
    [train_X[-1][1:], [train_Y[-1]]])
pred_x = (pred_X - Xav) / Xst 
pred_Y = model.predict(
    np.expand_dims(pred_x, 0)) * Yst + Yav

result = {'predict': pred_Y[0][0], 'change': pred_Y[0][0] - train_Y[-1]}
for i in result: result[i] = float(result[i])

from ServerScripts.MongoDB import client, mongo_url
from ServerScripts.MongoDB import Mongo_update_collec
Mongo_update_collec(collection=client["TaiwanStock"]['TAIEX_predicts'], input_data=[result])
