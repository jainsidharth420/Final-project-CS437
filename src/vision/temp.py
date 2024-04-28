from roboflow import Roboflow
import supervision as sv
import cv2

rf = Roboflow(api_key="lwcDLr14Lt1dIiH65dvJ")
project = rf.workspace().project("chesspiece-detection-twhpv")
model = project.version(5).model

result = model.predict("IMG_1207.JPG", confidence=40, overlap=30).json()

labels = [item["class"] for item in result["predictions"]]

detections = sv.Detections.from_inference(result)

label_annotator = sv.LabelAnnotator()
bounding_box_annotator = sv.BoundingBoxAnnotator()

image = cv2.imread("IMG_1207.JPG")

annotated_image = bounding_box_annotator.annotate(
    scene=image.copy(), detections=detections)
annotated_image = label_annotator.annotate(
    scene=annotated_image.copy(), detections=detections, labels=labels)

sv.plot_image(image=annotated_image)